export type Testimonial = {
  id: number;
  name: string;
  role: string;
  organisation: string;
  message: string;
  initials: string;
  relationship: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mentor Name",
    role: "Software Development Mentor",
    organisation: "Add organisation",
    message:
      "Priyanshu approaches technical problems with patience and determination. He is willing to learn from feedback and consistently works to improve his development skills.",
    initials: "MN",
    relationship: "Mentor",
  },
  {
    id: 2,
    name: "Classmate Name",
    role: "Computer Science Student",
    organisation: "Add university",
    message:
      "Priyanshu is supportive during team activities and takes responsibility for completing his part of a project. He is especially interested in Java and full-stack development.",
    initials: "CN",
    relationship: "Classmate",
  },
  {
    id: 3,
    name: "Project Teammate",
    role: "Frontend Developer",
    organisation: "Personal Project Team",
    message:
      "Working with Priyanshu was a positive experience. He communicates clearly, remains focused on the goal and is always ready to explore a better solution.",
    initials: "PT",
    relationship: "Teammate",
  },
  {
    id: 4,
    name: "Faculty Name",
    role: "Computer Science Faculty",
    organisation: "Add university",
    message:
      "Priyanshu demonstrates genuine interest in programming and software engineering. His willingness to practise and ask questions helps him make steady progress.",
    initials: "FN",
    relationship: "Faculty",
  },
];