import Annotation from "./Annotation";

export default function Philosophy() {
  return (
    <section className="border-b border-ink/10 px-6 py-16 sm:px-10 lg:px-16">
      <p className="mx-auto max-w-3xl text-center font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
        We don&rsquo;t believe in solo genius. We believe in{" "}
        <Annotation variant="circle">fourteen people arguing about kerning</Annotation> until
        it&rsquo;s right.
      </p>
    </section>
  );
}
