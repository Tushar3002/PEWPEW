import { useLoader } from "../context/LoaderContext";

const Loader = () => {
    const { loading } = useLoader();

    if (!loading) return null;

    return (
        <div className="loader-overlay" role="status" aria-live="polite" aria-label="Loading">
            <div className="spinner-border text-dark" />
        </div>
    );
};

export default Loader