export class AuthDriver {
    knex;
    schema;
    constructor(options, _config) {
        this.knex = options.knex;
        this.schema = options.schema;
    }
    /**
     * Check with the (external) provider if the user is allowed entry to Directus
     *
     * @param _user User information
     * @param _payload Any data that the user might've provided
     * @throws InvalidCredentialsException
     * @returns Data to be stored with the session
     */
    async login(_user, _payload) {
        return;
    }
    /**
     * Handle user session refresh
     *
     * @param _user User information
     * @throws InvalidCredentialsException
     */
    async refresh(_user) {
        return;
    }
    /**
     * Handle user session termination
     *
     * @param _user User information
     */
    async logout(_user) {
        return;
    }
}
