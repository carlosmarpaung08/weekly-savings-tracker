export default function Card({ children, className = "", variant = "" }) {
  const variantClass = {
    elevated: "card-elevated",
    accent:   "card-accent",
    sm:       "card-sm",
  }[variant] || "";

  return (
    <div className={`card ${variantClass} ${className}`.trim()}>
      {children}
    </div>
  );
}