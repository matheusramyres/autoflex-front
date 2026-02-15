import type { Table } from '@tanstack/react-table';

interface PaginationControllerProps<T> {
  table: Table<T>;
}
export function PaginationController<T>({
  table,
}: PaginationControllerProps<T>) {
  return (
    <div className="flex items-center justify-between mt-4 px-4">
      <span className="text-sm text-gray-400">
        Página {table.getState().pagination.pageIndex + 1} de{' '}
        {table.getPageCount()}
      </span>

      <div className="flex gap-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40"
        >
          Anterior
        </button>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
