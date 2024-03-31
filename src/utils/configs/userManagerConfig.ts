export const UserManagerConfig = {
    // additionFieldsInDatabase: ['user_id', 'creation_time', 'email', 'name', 'surname', 'nick', 'birth_date'],
    additionFieldsInDatabase: ['user_id', 'email', 'name', 'surname', 'nick'],

    //! How to deal with creationtime
    typesof: {
        user_id: 'string',
        // creation_time: 'number',
        email: 'string',
        name: 'string',
        surname: 'string',
        nick: 'string',
        // birth_date: 'string',
    }
}