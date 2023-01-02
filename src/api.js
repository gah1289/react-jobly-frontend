import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
	// the token for interactive with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		// console.debug('API Call:', endpoint, data, method);

		//there are multiple ways to pass an authorization token, this is how you pass it in the header.
		//this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${JoblyApi.token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message)
				? message
				: [
						message
					];
		}
	}

	// Individual API routes

	// Get companies and be able to filter

	static async getCompanies(data) {
		let res = await this.request(`companies`, { ...data });
		return res.companies;
	}

	/** Get details on a company by handle. */

	static async getCompany(handle) {
		let res = await this.request(`companies/${handle}`);
		return res.company;
	}

	// Get details of a user by user id

	static async getUser(userId) {
		let res = await this.request(`users/${userId}`);
		return res.user;
	}

	// change user information by data

	static async updateUser(data) {
		const { username, firstName, lastName, email } = data;

		try {
			let res = await this.request(`users/${username}`, { firstName, lastName, email }, 'patch');
			return res.user;
		} catch (e) {
			throw e;
		}
	}

	// Get all jobs or filter by search terms

	static async getJobs(data) {
		let res = await this.request(`jobs`, { ...data });
		return res.jobs;
	}
	// Get a details of a job by a job id
	static async getJob(jobId) {
		let res = await this.request(`jobs/${jobId}`);
		return res.job;
	}

	// allow user to log in. returns token
	static async login(data) {
		try {
			let res = await this.request(`auth/token`, { ...data }, 'post');
			localStorage.setItem('token', res.token);
			localStorage.setItem('username', data.username);
			this.token = res.token;
			return res.token;
		} catch (e) {
			throw e;
		}
	}

	// allow user to signup
	static async register(data) {
		try {
			let res = await this.request(`auth/register`, { ...data }, 'post');
			return res;
		} catch (e) {
			throw e;
		}
	}

	// allow user to apply for job
	static async apply(username, jobId) {
		try {
			let res = await this.request(`users/${username}/jobs/${jobId}`, {}, 'post');
			return res;
		} catch (e) {
			throw e;
		}
	}
}

export default JoblyApi;
