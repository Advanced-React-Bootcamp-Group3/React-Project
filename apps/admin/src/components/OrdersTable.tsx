export default function OrdersTable({
  carts,
  onSelect,
}: {
  carts: any[];
  onSelect?: (c: any) => void;
}) {
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
            style={{ cursor: onSelect ? "pointer" : "default" }}
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
