const getYoutubeId = url => {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([\w-]{11})$/;
    const match = url.match(regExp);
    return match ? match[1] : null;
};

const getYoutubeThumbnail = id => `https://img.youtube.com/vi/${id}/0.jpg`;

const getYoutubeEmbedUrl = id => `https://www.youtube.com/embed/${id}`;

module.exports = {
    getYoutubeId,
    getYoutubeThumbnail,
    getYoutubeEmbedUrl,
};
