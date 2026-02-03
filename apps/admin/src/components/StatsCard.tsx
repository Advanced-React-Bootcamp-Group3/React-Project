type Props = { title: string; value: string | number };

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="card" role="region" aria-label={title}>
      <div className="muted" style={{ marginBottom: 6 }}>
        {title}
      </div>
      <div className="big">{value}</div>
    </div>
  );
}
