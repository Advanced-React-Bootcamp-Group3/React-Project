export default function ProductsTable({ products }: { products: any[] }) {
  return (
    <table className="table" aria-label="Products table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.title}</td>
            <td>${p.price}</td>
            <td>{p.stock ?? "-"}</td>
            <td>{p.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
