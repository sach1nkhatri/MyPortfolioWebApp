export class HomeData {
    constructor() {
        this.intro = {
            title: "Hi, I am Sachin, Creative Techie",
            description: `I am creative in UI/UX design and web development, Android development using Kotlin, desktop app development using Python, and more. My expertise includes Figma design, PostgreSQL, MySQL, React.js, HTML, and CSS. Additionally, I have skills in video editing, which allows me to create and refine engaging multimedia content. My proficiency in UI/UX design ensures that I craft intuitive and aesthetically pleasing interfaces. I also bring experience in sound engineering and sound design, providing a comprehensive approach to audio production and design.`,
            resumeLink: "https://drive.google.com/file/d/19UsVQWL4nKQ5w7fC3sqDBfq4UG8CICRm/view?usp=sharing",  // Use the correct path relative to public directory
            resumeName: "SachinKhatri.pdf",
        };
        this.profileImage = "/profileimage.jpg";
    }
}

// You can export an instance if you want to use a singleton pattern
export const homeData = new HomeData();
