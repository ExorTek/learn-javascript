import { useEffect, useState } from 'react';

const getReturnValues = (time) => {
    const { day, hour, minute, second } = time;

    if (day === 0 && hour === 0 && minute === 0 && second === 0) {
        return {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0,
        };
    }

    const totalSeconds = day * 24 * 60 * 60 + hour * 60 * 60 + minute * 60 + second - 1;
    const newDay = Math.floor(totalSeconds / (24 * 60 * 60));
    const remainingSeconds = totalSeconds % (24 * 60 * 60);
    const newHour = Math.floor(remainingSeconds / (60 * 60));
    const remainingSecondsAfterHours = remainingSeconds % (60 * 60);
    const newMinute = Math.floor(remainingSecondsAfterHours / 60);
    const newSecond = remainingSecondsAfterHours % 60;

    return {
        day: newDay,
        hour: newHour,
        minute: newMinute,
        second: newSecond,
    };
};
const useCountdown = ({ targetTime, start, setStart }) => {
    const [countDown, setCountDown] = useState(targetTime);

    useEffect(() => {
        if (start) {
            const interval = setInterval(() => {
                setCountDown((prev) => {
                    if (prev.day === 0 && prev.hour === 0 && prev.minute === 0 && prev.second === 0) {
                        setStart(false);
                        return targetTime;
                    }
                    return getReturnValues(prev);
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [start]);

    return countDown;
};

export default useCountdown;