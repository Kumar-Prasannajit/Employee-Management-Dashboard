// Empty State Component
export default function EmptyState({ title, message, icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-800 rounded-xl border border-gray-700">
      {Icon && <Icon size={48} className="text-gray-600 mb-4" />}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 max-w-md">{message}</p>
    </div>
  );
}
