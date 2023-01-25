function useTimeout(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setTimeout(tick, delay);
            return () => clearTimeout(id);
        }
    }, [delay]);
}


function Wait({ delay = 1000, placeholder, ui }) {
    const [show, setShow] = useState(false)
    useTimeout(() => setShow(true), delay)
    return show === true
        ? ui
        : placeholder
}
export default useTimeout;
