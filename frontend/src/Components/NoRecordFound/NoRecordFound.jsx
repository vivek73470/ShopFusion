const NoRecordsFound = ({ message = "No records found", subText }) => {
    return (
        <div style={styles.container}>
            <div style={styles.iconWrapper}>
                <div style={styles.iconCircle}>
                    <span style={styles.icon}>🔍</span>
                </div>
            </div>
            <h2 style={styles.title}>{message}</h2>
            {subText && <p style={styles.subText}>{subText}</p>}
        </div>
    );
};

const styles = {
    container: {
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        textAlign: "center",
    },
    iconWrapper: {
        marginBottom: "24px",
    },
    iconCircle: {
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        border: "3px solid #fff",
    },
    icon: {
        fontSize: "56px",
        opacity: "0.7",
    },
    title: {
        fontSize: "24px",
        fontWeight: "600",
        color: "#111827",
        marginBottom: "8px",
        letterSpacing: "-0.02em",
    },
    subText: {
        fontSize: "15px",
        color: "#6b7280",
        maxWidth: "400px",
        lineHeight: "1.6",
    },
};

export default NoRecordsFound;