export default function OrdersTable({
  carts,
  onSelect,
}: {
  carts: any[];
  onSelect?: (c: any) => void;
}) {
  const handleKey = (e: React.KeyboardEvent, c: any) => {
    if (!onSelect) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(c);
    }
  };

  return (
    <table className="table" aria-label="Orders table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>User ID</th>
          <th>Items</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {carts?.map((c: any) => (
          <tr
            key={c.id}
            onClick={() => onSelect?.(c)}
            onKeyDown={(e) => handleKey(e, c)}
            tabIndex={onSelect ? 0 : -1}
            style={{ cursor: onSelect ? "pointer" : "default" }}
            role={onSelect ? "button" : undefined}
          >
            <td>{c.id}</td>
            <td>{c.userId}</td>
            <td>{c.products?.length ?? 0}</td>
            <td>${c.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
