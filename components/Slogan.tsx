export default function Slogan() {
  return (
    <section className="py-20 bg-surface-sunken text-ink text-center relative overflow-hidden">

      <div className="absolute inset-0 radial-fade pointer-events-none" />

      <div className="max-w-5xl mx-auto px-8 relative">

        <p className="uppercase tracking-[6px] text-red-500 font-semibold text-sm">
          Notre Engagement
        </p>

        <div className="divider-red w-16 mx-auto mt-5" />

        <h2 className="text-5xl font-black mt-6 leading-tight">
          FORMER.
          <br />
          CONNECTER.
          <br />
          <span className="text-gradient-red">
            VALORISER.
          </span>
        </h2>

      </div>

    </section>
  );
}