import { useState } from "react"

export const useLoadErrorHook = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const handleStopLoading = () => setLoading(false);
    const handleError = (error: string) => {
        setError(error)
        handleStopLoading();
    };
    const clearError = () => setError(undefined);
    const handleStartLoading = () => {
        setLoading(true);
        clearError();
    };

    return {
        loading,
        error,
        handleStopLoading,
        handleError,
        clearError,
        handleStartLoading
    }
}