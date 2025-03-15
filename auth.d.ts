declare module '#auth-utils' {
    interface User {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        firmId: string;
        userId: string;
        accessProfileId: string;
        accessProfile: {
            id: string;
            display: string;
            firmId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        user: {
            id: string;
            firstname: string;
            lastname: string;
            // password is omitted!
            email: string;
        };
    }

    interface UserSession {
        loggedInAt: Date
    }

    interface SecureSessionData {
        // Add your own fields
    }
}

export {

}