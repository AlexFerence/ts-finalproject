export interface Log {
    courseName: string;
    professorNotes: Array<string>;
}

export interface Review {
    rating: number;
    comment: string;
}

export interface TA {
    email: string;
    firstName: string;
    lastName: string;
    faculty: string;
    department: string;
    averageRating: number;
    allReviews: Array<Review>;
    allCourses: Array<string>;
    previousCourses: Array<string>;
    allLogs: Array<Log>;
}

