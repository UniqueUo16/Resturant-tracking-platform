import Image from "next/image";

export default function Contact() {
  return (
    <section className="relative bg-[#0c0b09] text-gray-300 min-h-screen overflow-hidden font-sans">
      {/* MINI HERO SECTION */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <Image
          src="/imgs/special-dish-banner.jpg" // 👉 replace with your banner image
          alt="Elegant restaurant interior"
          fill
          className="object-cover brightness-[60%]"
          priority
        />
        <div className="absolute inset-0  flex flex-col justify-center items-center text-center">
          <h1 className="text-amber-500 text-5xl md:text-6xl font-serif mb-3 tracking-wide">
            Contact Us
          </h1>
          <p className="text-gray-300 text-sm md:text-base italic max-w-xl px-4">
            Reach out for reservations, private dining, or any inquiries — we’re here to serve you.
          </p>
        </div>
      </div>

      {/* Background overlay (for the rest of the section) */}
      <div className="absolute inset-0 bg-[url('/imgs/shape-4.png')] bg-cover bg-center opacity-10 -z-10"></div>

      {/* CONTACT SECTION */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-16">
        {/* LEFT — Contact Info */}
        <div className="flex-1 space-y-8">
          <h2 className="text-amber-500 text-3xl font-serif tracking-wide">Get In Touch</h2>
          <p className="text-gray-400 leading-relaxed max-w-md">
            We’d love to hear from you. Whether you’d like to make a reservation, plan a private
            event, or simply learn more about our menu — our team is here to help.
          </p>

          <div className="space-y-6 mt-8">
            <div>
              <h3 className="text-lg font-semibold text-white font-serif">Address</h3>
              <p className="text-gray-400">12 Grand Avenue, Manhattan, New York, USA</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white font-serif">Phone</h3>
              <p className="text-gray-400">+1 (212) 555-0189</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white font-serif">Email</h3>
              <p className="text-gray-400">reservations@uniqueuo.com</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white font-serif">Opening Hours</h3>
              <p className="text-gray-400">Mon – Sun: 11:00 AM – 11:00 PM</p>
            </div>
          </div>

          <div className="flex gap-4 mt-10">
            {["tiktok", "youtube", "twitter", "linkedin"].map((icon) => (
              <span
                key={icon}
                className="w-10 h-10 flex justify-center items-center rounded-full bg-[#1a1a1a] hover:bg-amber-500 hover:text-black transition cursor-pointer"
              >
                <i className={`ri-${icon}-fill text-lg`}></i>
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — Contact / Reservation Form */}
        <div className="flex-1 bg-[#111] bg-opacity-60 p-10 rounded-3xl shadow-xl backdrop-blur-sm">
          <h3 className="text-2xl font-serif text-white mb-6 border-b border-gray-700 pb-3">
            Send Us a Message
          </h3>

          <form className="space-y-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="flex-1 py-3 px-4 bg-transparent border border-gray-600 rounded-full text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 py-3 px-4 bg-transparent border border-gray-600 rounded-full text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="w-full py-3 px-4 bg-transparent border border-gray-600 rounded-full text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500"
            />

            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full py-3 px-4 bg-transparent border border-gray-600 rounded-3xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500 resize-none"
            ></textarea>

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-full transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="relative mt-16 w-full h-[400px]">
        <iframe
          className="w-full h-full grayscale-[60%] brightness-[80%] contrast-[90%] border-t border-gray-700"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.805247950914!2d-74.00601548459343!3d40.712775779331885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3bffca7e83f9c7cf!2sRestaurant!5e0!3m2!1sen!2sus!4v1694100000000!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
