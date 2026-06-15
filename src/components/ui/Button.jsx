export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  className = "",
}) {
  const variantClass = {
    primary: "btn-primary",
    danger:  "btn-danger",
    ghost:   "btn-ghost",
    outline: "btn-outline",
  }[variant] || "btn-primary";

  const sizeClass = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
  }[size] || "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}
    >
      {children}
    </button>
  );
}