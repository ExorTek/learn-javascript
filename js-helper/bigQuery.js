const bigQuery = new BigQuery({
    projectId: "BIGQUERY_PROJECT_ID",
    credentials: "googleAuthFile"
});
async function getAllUser(ctx) {
    const [data] = await this.runQueryJob({
        query: `SELECT * FROM ${"BIGQUERY_USER_TABLE_ID"}`,
        location: "BIGQUERY_LOCATION",
        parameterMode: 'positional',
        useLegacySql: false
    });
    return data;
}
async function runQueryJob(bigQueryQuery) {
    let job;
    try {
        [job] = await bigQuery.createQueryJob(bigQueryQuery)
    } catch (e) {
        throw new CustomError(e.errors[0] === 'accessDenied' ? 'Access Denied!' : e.errors[0].message, 401)
    }
    const awaitForJobStatus = async () => {
        const [result] = await job.getMetadata();
        if (result.status && result.status.state === 'DONE') {
            if (result.status.errorResult) {
                throw new CustomError(
                    result.status.errorResult.message ?
                        result.status.errorResult.message :
                        JSON.stringify(result.status.errorResult), 500
                );
            }
        } else {
            return null;
        }
        return job.getQueryResults();
    };
    for (let i = 0; i < 15 * 60 / 5; i++) {
        const result = await awaitForJobStatus();
        if (result) {
            return result;
        }
        await this.pause(Math.min(5000, 200 * i));
    }
    throw new CustomError('BigQuery job timeout!', 500);
},
function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}