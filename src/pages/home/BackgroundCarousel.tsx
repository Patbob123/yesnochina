<div id="bgCarousel" className="absolute inset-0 right-0 md:left-1/3 left-0">
  {SLIDES.map((src, i) => (
    <img
      key={i}
      src={src}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ opacity: 0 }}
      data-slide={i}
    />
  ))}
  {/* fade to white on the left so text stays readable */}
  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
</div>