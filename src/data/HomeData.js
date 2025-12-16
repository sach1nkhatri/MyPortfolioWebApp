// Import image properly so bundler handles it
import profileImage from "../assets/profile1.png";

export class HomeData {
  constructor() {
    this.intro = {
      title: "Hi, I am Sachin",
      description: `I’m a passionate human who lives at the intersection of code, creativity, and intelligence.
From crafting stunning UIs with Flutter and React, to building smart systems with Python, MongoDB, and PostgreSQL,
I love turning big ideas into real-world impact.

Now deep-diving into the world of AI, Machine Learning, and Data Science,
I’m on a mission to create intuitive, intelligent experiences that wow users and solve real problems.`,
      resumeLink:
        "https://drive.google.com/file/d/19UsVQWL4nKQ5w7fC3sqDBfq4UG8CICRm/view?usp=sharing",
      resumeName: "SachinKhatri.pdf",
    };

    this.profileImage = profileImage;
  }
}

// Singleton export (easy usage)
export const homeData = new HomeData();
