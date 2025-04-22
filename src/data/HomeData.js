export class HomeData {
    constructor() {
        this.intro = {
            title: "Hi, I am Sachin",
            description: `I’m a passionate human who lives at the intersection of code, creativity, and intelligence. From crafting stunning UIs with Flutter and React, to building smart systems with Python, MongoDB, and PostgreSQL, I love turning big ideas into real-world impact.
                        Now deep-diving into the world of AI, Machine Learning, and Data Science, I’m on a mission to create intuitive, intelligent experiences that wow users and solve real problems.`,
            resumeLink: "https://drive.google.com/file/d/19UsVQWL4nKQ5w7fC3sqDBfq4UG8CICRm/view?usp=sharing",  // Use the correct path relative to public directory
            resumeName: "SachinKhatri.pdf",
        };
        this.profileImage = "/profileimage.jpg";
    }
}

// You can export an instance if you want to use a singleton pattern
export const homeData = new HomeData();
