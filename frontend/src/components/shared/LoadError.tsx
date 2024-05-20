import { Spinner, Text } from "@chakra-ui/react";
import * as React from "react"
const LoadError: React.FC<{
    loading: boolean;
    error?: string;
}> = (props) => {
    return (
        <>
            {props.error && (
                <Text fontSize='md' color="red" mt={2}> {props.error}</Text>
            )}
            {props.loading && (
                <Spinner color="gray" mt={2} />
            )}
        </>
    );
}
export default LoadError