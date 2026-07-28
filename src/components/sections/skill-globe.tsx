import styles from "./skill-globe.module.css";
const globeSkills = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Tailwind CSS',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Mongoose',
  'REST APIs',
  'JWT',
  'Gemini API',
  'Java',
  'Python',
  'Git',
  'GitHub',
  'Postman',
  'Vercel',
  'Docker',
  'AWS',
  'Kubernetes',
  'DBMS',
  'Operating Systems',
  'Computer Networks',
  'Data Structures',
  'CRUD Operations',
  'Responsive Design',
  'API Development',
]

function calculatePosition(index: number, total: number) {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  const y = 1 - (index / (total - 1)) * 2
  const radiusAtY = Math.sqrt(1 - y * y)
  const angle = goldenAngle * index

  const sphereRadius = 250

  return {
    x: Math.cos(angle) * radiusAtY * sphereRadius,
    y: y * sphereRadius,
    z: Math.sin(angle) * radiusAtY * sphereRadius,
  }
}

export default function SkillGlobe() {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p>MY TECHNOLOGY UNIVERSE</p>

        <h2>Explore My Skills</h2>

        <span>
          Move your cursor over the globe and hover on a skill to
          view it clearly.
        </span>
      </div>

      <div className={styles.globeWrapper}>
        <div className={styles.glow} />

        <div className={styles.globe}>
          {globeSkills.map((skill, index) => {
            const position = calculatePosition(
              index,
              globeSkills.length,
            )

            return (
              <div
                className={styles.skillPosition}
                key={skill}
                style={{
                  transform: `translate3d(
                    ${position.x}px,
                    ${position.y}px,
                    ${position.z}px
                  )`,
                }}
              >
                <span className={styles.skill}>{skill}</span>
              </div>
            )
          })}
        </div>

        <div className={styles.orbitOne} />
        <div className={styles.orbitTwo} />
      </div>
    </section>
  )
}