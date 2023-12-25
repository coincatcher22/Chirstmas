import {useState, useEffect} from "react";
import {differenceInSeconds} from "date-fns";
import styles from "./CountDownTimer.module.scss";


const CountDownTimer = ({open, ...props}) => {
    const currentDate = new Date();
    const newYearDate= new Date(currentDate.getFullYear() + 1, 0, 0, 0, 0, 0);

    const [secondsDiffer, setSecondsDiffer] = useState(0);
    const [filteredDate, setFilteredDate] = useState(null);

    useEffect(() => {
        setFilteredDate({
            days: Math.floor(secondsDiffer / (3600*24)),
            hours: Math.floor(secondsDiffer % (3600*24) / 3600),
            minutes: Math.floor(secondsDiffer % 3600 / 60),
            seconds: Math.floor(secondsDiffer % 60),
        });
    }, [secondsDiffer]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const result = differenceInSeconds(
                newYearDate,
                new Date()
            );
            setSecondsDiffer(result);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    });

    return (
        <>
            {/* Happy New Year */}
            {(currentDate.getDate() === 1 && currentDate.getMonth() + 1 === 1) &&
                <h3 className={styles.happyNewYearTitle}>
                    Happy New Year!
                </h3>
            }
            {(filteredDate && secondsDiffer > 0) &&
                <div className={styles.countDownContainer}>
                    <div className={styles.countDownItem}>
                        <span className={styles.countDownItemValue}>{filteredDate.days}</span>
                        <span className={styles.countDownItemDescription}>Days</span>
                    </div>
                    <div className={styles.countDownItem}>
                        <span className={styles.countDownItemValue}>{filteredDate.hours}</span>
                        <span className={styles.countDownItemDescription}>Hours</span>
                    </div>
                    <div className={styles.countDownItem}>
                        <span className={styles.countDownItemValue}>{filteredDate.minutes}</span>
                        <span className={styles.countDownItemDescription}>Minutes</span>
                    </div>
                    <div className={styles.countDownItem}>
                        <span className={styles.countDownItemValue}>{filteredDate.seconds}</span>
                        <span className={styles.countDownItemDescription}>Seconds</span>
                    </div>
                </div>
            }
        </>

    );
}

export default CountDownTimer;
