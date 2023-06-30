export const ErrorType = {
    JWT: {
        FailGenerating: 'Fail generating JWT',
        InvalidToken: 'Invalid token',
        ParseError: 'Error parsing JWT token',
    },
    MissingEnvironmentVariable: 'Missing environment variable',
    ValidationError: 'Validation error',
    User: {
        ErrorNotFound: 'User not found',
        ErrorFetching: 'Error fetching user',
        ErrorCreating: 'Error creating user',
        AlredyExists: 'User already exists',
    },
    bcrypt: {
        ErrorHashing: 'Error hashing password',
        ErrorVerifying: 'Error verifying password',
    }
}