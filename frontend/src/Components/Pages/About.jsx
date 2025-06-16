export function About() {
    return (
      <div style={{
        maxWidth: "1000px",
        margin: "50px auto",
        padding: "40px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Segoe UI, sans-serif"
      }}>
        <h1 style={{ fontSize: "36px", color: "#007BFF", marginBottom: "20px" }}>
          About Online Medicine Store  "PharmaCart"
        </h1>
  
        <p style={{ fontSize: "18px", color: "#333", lineHeight: "1.6", marginBottom: "30px" }}>
          Welcome to <strong> PharmaCart </strong>, a modern and reliable platform developed by <strong> Team </strong> 
          for easy access to healthcare and pharmaceutical products. This MERN-based application is designed to bring 
          convenience, trust, and efficiency to online medicine shopping.
        </p>
  
        <div style={{
          display: "flex",
          flexDirection: window.innerWidth > 768 ? "row" : "column",
          gap: "40px",
          marginBottom: "40px"
        }}>
          <img 
            src="https://img.freepik.com/free-vector/medical-online-service-pharmacist-doctor-chemist-computer-screen-clinic-consultation-drugstore-telemedicine-pharmaceutical-online-service_335657-2547.jpg?w=740"
            alt="Online Medical Store"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "10px",
              objectFit: "cover"
            }}
          />
          <div>
            <h2 style={{ fontSize: "28px", marginBottom: "15px", color: "#333" }}>Why This Project?</h2>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
              The need for accessible online healthcare solutions is growing rapidly. This application allows users to browse 
              and purchase a variety of medicines with ease. Features like product search, secure checkout, cart management, 
              and detailed descriptions make it both functional and user-friendly.
            </p>
          </div>
        </div>
  
        <h2 style={{ fontSize: "26px", color: "#007BFF", marginBottom: "15px" }}>Technologies Used</h2>
        <ul style={{ fontSize: "16px", color: "#444", lineHeight: "1.8", paddingLeft: "20px" }}>
          <li><strong>Frontend:</strong> React.js</li>
          <li><strong>Backend:</strong> Node.js & Express.js</li>
          <li><strong>Database:</strong> MongoDB</li>
          <li><strong>Styling:</strong> CSS3 / Inline Styles / Tailwind (optional)</li>
          <li><strong>Routing:</strong> React Router</li>
        </ul>
  
        <div style={{ marginTop: "40px", fontSize: "16px", color: "#777" }}>
          {/* <em>Developed by Mahnoor — Passionate about building user-centric healthcare solutions.</em> */}
        </div>
      </div>
    );
  }
  