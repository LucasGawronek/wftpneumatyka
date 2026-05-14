type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="panel rounded-[1.75rem] px-6 py-10 text-center">
      <p className="label text-[var(--color-rust)]">Brak danych</p>
      <h3 className="mt-4 text-2xl font-semibold">{title}</h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[var(--color-steel)]">
        {description}
      </p>
    </div>
  );
}
