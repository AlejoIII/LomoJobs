interface HeroProps {
  title: string;
  subtitle: string;
  placeholder: string;
  buttonText: string;
  onSearch: (query: string) => void;
}

export default function Hero({
  title,
  subtitle,
  placeholder,
  buttonText,
  onSearch,
}: HeroProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    onSearch(query);
  };

  return (
    <section className="container py-12">
      <h1 className="text-4xl font-bold text-center">{title}</h1>
      <p className="text-center text-gray-700 mt-2">{subtitle}</p>
      <form
        className="flex gap-2 mt-4 max-w-md mx-auto"
        onSubmit={handleSearch}
      >
        <input
          type="search"
          name="search"
          className="border border-gray-400 w-full py-2 px-3 rounded-md"
          placeholder={placeholder}
        />
        <button
          type="submit"
          className="bg-purple-400 hover:bg-purple-500 text-white py-2 px-4 rounded-md transition"
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
}