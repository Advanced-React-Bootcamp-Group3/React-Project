type Product = {
  id: number | string;
  title: string;
  price?: number;
  stock?: number;
  category?: string;
};

export default function ProductsTable({ products }: { products: Product[] }) {
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
        {products?.map((p: Product) => (
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
