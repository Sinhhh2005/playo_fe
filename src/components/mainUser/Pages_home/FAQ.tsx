import React, { useState } from "react";

const faqs = [
  {
    question: "How can I use Playo to book sports venues or to join sports activities?",
    answer: (
      <p>
        Playo is the world’s largest sports community platform, which helps you discover and book venues for 50+ sports, including football, badminton, tennis, cricket, etc. Once you sign up, you can search by location, sport, and time to find available slots. You also earn redeemable Karma points with every booking. <br />
        <strong>Pro Tip:</strong> Karma points are redeemable through the Playo app only. Click{" "}
        <a href="#" className="text-green-600 underline">
          here to download
        </a>
        .
      </p>
    ),
  },
  {
    question: "What is the Playo Partner App, and how does it help venue owners?",
    answer: (
      <p>
        The Playo Partner App is built for venue owners and facility managers of sports turfs, courts, gyms, pools, and multi-sport centres. It helps you manage bookings, manage your slots and pricing, track earnings, monitor cancellations, access booking logs, generate reports, and assign staff roles, all from your phone or desktop. <br />
        To know more, read the full{" "}
        <a href="#" className="text-green-600 underline">
          blog
        </a>
        .
      </p>
    ),
  },
  {
    question: "Can I reschedule or cancel a booking made on Playo? How does it work?",
    answer: (
      <p>
        Yes, you can reschedule or cancel a booking via the Playo app, but the policies vary depending on the venue. Most venues allow easy rescheduling without penalty if done within the permitted window.{" "}
        <a href="#" className="text-green-600 underline">
          Cancellation policies
        </a>{" "}
        apply. Refunds (if applicable) are typically processed within 7 working days.
      </p>
    ),
  },
  {
    question: "What Is Karma in Playo?",
    answer: (
      <p>
        Karma is Playo’s in-app rewards system. Every time you make a booking, host a game, or take part in community activities, you earn Karma points. These points can be redeemed for discounts on your future bookings within the Playo app. To learn more, check out this{" "}
        <a href="#" className="text-green-600 underline">
          blog
        </a>
        .
      </p>
    ),
  },
  {
    question: "How to Host a Game in Playo?",
    answer: (
      <p>
        Hosting a game on Playo is simple. After signing up, go to the “Host a Game” option in the app, select your preferred sport, venue, date, and time, and publish your game. Other players nearby can then view and join your game.
      </p>
    ),
  },
  {
    question: "How Do I Contact Playo?",
    answer: (
      <p>
        You can contact Playo directly through the in-app support section for quick assistance. You can also get in touch via our customer care number +91 80 9561 4656, or email us at{" "}
        <a href="mailto:contact@playo.co" className="text-green-600 underline">
          contact@playo.co
        </a>
        . For more details, visit our{" "}
        <a href="#" className="text-green-600 underline">
          Contact Us page
        </a>
        .
      </p>
    ),
  },
  {
    question: "What are the Benefits of Using Playo?",
    answer: (
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        <li>Book verified venues for 50+ sports with real-time availability.</li>
        <li>Host or join games and connect with nearby players.</li>
        <li>Manage RSVPs easily without group chat confusion.</li>
        <li>Find certified trainers for personal or group sessions.</li>
        <li>Track your fitness stats, leaderboards, and Karma rewards.</li>
      </ul>
    ),
  },
];

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((i) => i !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-12">
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="divide-y">
            {faqs.map((faq, index) => (
              <div key={index} className="py-4">
                <button
                  className="w-full flex justify-between items-center text-left"
                  onClick={() => toggleItem(index)}
                >
                  <span className="flex items-start">
                    <span className="mr-2 text-gray-600">•</span>
                    <span className="text-gray-800">{faq.question}</span>
                  </span>
                  <span className="text-gray-500">{openItems.includes(index) ? "▲" : "▼"}</span>
                </button>
                {openItems.includes(index) && (
                  <div className="mt-2 ml-6 text-gray-600 text-sm">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
