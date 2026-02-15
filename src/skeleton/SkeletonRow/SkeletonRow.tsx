export const SkeletonRow = () => {
  return (
    <tr>
      <td className="p-4 border-t border-erp-subtle">
        <div className="skeleton w-4 h-4 rounded" />
      </td>

      <td className="p-4 border-t border-erp-subtle">
        <div className="skeleton h-4 w-40" />
      </td>

      <td className="p-4 border-t border-erp-subtle">
        <div className="skeleton h-4 w-24" />
      </td>

      <td className="p-4 border-t border-erp-subtle">
        <div className="skeleton w-8 h-6 rounded-full mx-auto" />
      </td>

      <td className="p-4 border-t border-erp-subtle">
        <div className="flex justify-end gap-2">
          <div className="skeleton w-6 h-6 rounded" />
          <div className="skeleton w-6 h-6 rounded" />
        </div>
      </td>
    </tr>
  );
};
