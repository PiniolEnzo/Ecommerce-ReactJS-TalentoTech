export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon ? (
        icon
      ) : (
        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )}
      <h3 className="text-lg font-medium text-gray-500 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-400 mb-4">{description}</p>}
      {action && action}
    </div>
  );
}
