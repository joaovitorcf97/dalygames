interface LabelProps {
  name: string;
}

export function Label({ name }: LabelProps) {
  return (
    <div className="flex-grow sm:flex-grow-0 py-2 px-3 bg-slate-200 rounded-lg hover:font-bold duration-300">
      {name}
    </div>
  );
}
