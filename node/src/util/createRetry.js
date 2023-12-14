export default function createRetry({
    maxTimeoutLength = 1000,
    timeoutLengthStep = 100,
    errorMessage = '',
    handleRepeatedError = (error) => {
        throw error
    },
    createPromise = () => Promise.resolve(),
    handleResolve = () => {},
}) {
    let timeoutLength = 0


    function promiser(...args) {
        return createPromise(...args).then((...resolvedArgs) => {
            timeoutLength = 0

            handleResolve(...resolvedArgs)
        })
    }


    function createCatcher(...args) {
        return error => {
            if (timeoutLength > maxTimeoutLength) {
                handleRepeatedError(error, ...args)
            }

            /* eslint-disable no-console */
            console.log(errorMessage, error)
            /* eslint-enable no-console */

            setTimeout(() => {
                promiser(...args).catch(createCatcher(...args))
            }, timeoutLength)

            timeoutLength += timeoutLengthStep
        }
    }


    return (...args) => {
        promiser(...args).catch(createCatcher(...args))
    }
}
