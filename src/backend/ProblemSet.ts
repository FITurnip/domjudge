import ApiService from "@/services/ApiService";

interface ProblemSetData {
    id?: string | undefined; // Optional for create
    title: string;
    isHidden: boolean;
}

class ProblemSet {
    static apiUrl = '/api/problem-sets/';

    static async getAll() {
        const response = await ApiService.get(this.apiUrl);

        return response;
    }

    static async create(request: ProblemSetData) {
        const response = await ApiService.post(this.apiUrl, {
            title: request.title,
            isHidden: request.isHidden,
        });

        return response;
    }

    static async update(request: ProblemSetData) {
        const response = await ApiService.put(this.apiUrl + request.id, {
            title: request.title,
            isHidden: request.isHidden,
        });

        return response;
    }

    static async delete(request: ProblemSetData) {
        const response = await ApiService.delete(this.apiUrl + request.id);

        return response;
    }
}

export default ProblemSet;