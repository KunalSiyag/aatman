import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

const sampleBlogPosts = [
  {
    title: "The Impact of Community Service",
    slug: "impact-of-community-service",
    excerpt:
      "How our community initiatives are making a difference in rural areas through education, health, and empowerment.",
    content: `
      <p>Community service has long been a cornerstone of societal progress, particularly in rural areas where resources are often scarce. Our initiatives focus on three key pillars: education, health, and empowerment. By addressing these areas, we aim to create sustainable change that uplifts entire communities. Education programs provide children and adults with access to learning opportunities, from basic literacy to vocational training. Health initiatives bring medical camps, awareness drives, and clean water projects to underserved regions. Empowerment, particularly for women, fosters economic independence through skill-building workshops and microfinance support.</p>
      <p>The impact of these efforts is profound. For instance, in a small village last year, our literacy program helped over 200 adults learn to read and write, opening doors to better employment. Health camps have vaccinated thousands, reducing preventable diseases by 30% in targeted areas. Women’s empowerment groups have launched small businesses, from tailoring to organic farming, creating a ripple effect of financial stability. These successes are not just numbers—they represent lives transformed, families strengthened, and communities revitalized.</p>
      <p>Yet, challenges remain. Rural infrastructure often limits access, and cultural barriers can slow progress, especially for women’s programs. Our approach is to work closely with local leaders to build trust and tailor solutions. Collaboration ensures that initiatives are not imposed but co-created, making them more effective and sustainable. Volunteers play a crucial role, bringing energy and ideas to the ground level, whether teaching in makeshift classrooms or distributing health kits.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non porta lacus. Morbi facilisis felis ac metus porttitor, non viverra neque dignissim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Quisque efficitur lorem vel fringilla. Proin vitae orci sed sem euismod feugiat. Donec nec sapien at lorem iaculis luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Looking ahead, we plan to scale our efforts by partnering with more organizations and leveraging technology, like mobile apps for health education. The goal is not just immediate aid but long-term self-sufficiency. Community service is about planting seeds for a future where rural areas thrive independently. Every step forward—whether a child reading their first book or a mother starting her own business—brings us closer to that vision. Together, we can continue to make a lasting difference, one community at a time.</p>
    `,
    author: "Divyansh Gaur",
    date: "2023-03-15T10:00:00Z",
    category: "Community",
    tags: ["Community", "Rural", "Empowerment", "Health", "Women"],
    image: "https://picsum.photos/800/500?random=1",
    imageAlt: "Volunteers helping build a rural school",
    estimatedReadTime: 6,
  },
  {
    title: "Yoga for Mental Wellbeing",
    slug: "yoga-for-mental-wellbeing",
    excerpt:
      "Exploring how yoga can improve mental clarity, reduce stress, and increase emotional balance in everyday life.",
    content: `
      <p>Yoga, an ancient practice rooted in aligning body and mind, has become a powerful tool for mental wellbeing in our fast-paced world. It offers more than physical exercise—it’s a holistic approach to reducing stress, enhancing clarity, and fostering emotional balance. Through mindful breathing, meditation, and gentle movements, yoga creates a space for individuals to reconnect with themselves, offering an oasis of calm amid daily chaos. Regular practice can lower cortisol levels, improve sleep quality, and boost mindfulness, making it a practical solution for modern mental health challenges.</p>
      <p>Consider the benefits of a simple morning yoga routine. Just 20 minutes of sun salutations paired with deep breathing can set a positive tone for the day, reducing anxiety before it builds. Studies show that yoga practitioners report a 40% reduction in stress-related symptoms after consistent practice. Meditation, a core component, trains the mind to focus, helping individuals manage overwhelming thoughts. For those juggling work, family, and personal goals, yoga provides tools to stay grounded, from pranayama (breath control) to restorative poses like child’s pose or savasana.</p>
      <p>Beyond the mat, yoga’s philosophy encourages self-compassion and resilience. It teaches us to accept our limits while striving for growth, a mindset that translates to better emotional regulation. Community yoga classes further amplify these benefits, fostering connection and support. Whether in a studio or a park, practicing with others builds a sense of belonging, combating loneliness—a key factor in mental health struggles. Even online sessions have made yoga accessible, allowing anyone with an internet connection to join.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a felis nec sapien blandit dignissim. Quisque ut turpis a sapien volutpat varius. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Starting yoga doesn’t require expertise or flexibility—just willingness. Beginners can try guided videos or local classes, focusing on consistency over perfection. Over time, the practice builds not just mental clarity but also confidence and inner peace. In a world that often feels overwhelming, yoga offers a path to balance, one breath at a time. By integrating it into daily life, we can cultivate a healthier mind and a more resilient spirit, ready to face whatever comes next.</p>
    `,
    author: "Priya Sharma",
    date: "2023-02-28T14:30:00Z",
    category: "Yoga",
    tags: ["Yoga", "Wellness", "Mental Health", "Meditation", "Breathing"],
    image: "https://picsum.photos/800/500?random=2",
    imageAlt: "Person meditating in a forest setting",
    estimatedReadTime: 5,
  },
  {
    title: "Nature Conservation Efforts",
    slug: "nature-conservation-efforts",
    excerpt:
      "Our latest programs to protect biodiversity and restore balance to local ecosystems.",
    content: `
      <p>Nature conservation is more critical than ever as ecosystems face threats from deforestation, pollution, and climate change. Our programs focus on protecting biodiversity and restoring balance to local environments through reforestation, wildlife preservation, and water conservation. Reforestation efforts involve planting native trees to rebuild habitats, with over 10,000 saplings planted last year alone. Wildlife initiatives protect endangered species by creating safe corridors and monitoring populations. Water conservation projects ensure clean, sustainable sources for communities and ecosystems alike.</p>
      <p>One success story is our river restoration project, which revived a polluted waterway into a thriving habitat for fish and birds. Volunteers cleaned tons of debris, while engineers redesigned banks to prevent erosion. The result? A 50% increase in local biodiversity within two years. Similarly, our forest programs not only plant trees but educate communities on sustainable practices, like agroforestry, which blends farming with tree growth. These efforts show that conservation isn’t just about saving nature—it’s about creating systems where humans and the environment coexist harmoniously.</p>
      <p>Challenges include funding and resistance from industries reliant on natural resources. We address this through advocacy, partnerships, and community involvement. By training locals as conservation ambassadors, we empower them to lead change, ensuring long-term impact. Technology, like satellite monitoring and mobile apps, helps track progress and engage supporters. Every small action—planting a tree, cleaning a stream, or educating a child—builds toward a healthier planet.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec odio eu nisl congue egestas a id odio. Nam facilisis sapien vel nisi lobortis, at laoreet ligula tristique. Curabitur at risus nisi. Donec nec facilisis risus. Fusce vehicula orci nec mauris bibendum, at ultrices tellus viverra. Curabitur rhoncus, ipsum eget convallis tincidunt, mauris risus egestas leo, non malesuada arcu purus at justo. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Our vision is a world where ecosystems thrive alongside human progress. Scaling these efforts requires collective action—governments, businesses, and individuals all have a role. Whether through volunteering, donating, or adopting sustainable habits, everyone can contribute. Nature gives us clean air, water, and food; it’s our responsibility to give back. Together, we can restore balance, ensuring a vibrant planet for future generations.</p>
    `,
    author: "Amit Patel",
    date: "2023-01-20T09:15:00Z",
    category: "Environment",
    tags: ["Nature", "Sustainability", "Forests", "Water", "Education"],
    image: "https://picsum.photos/800/500?random=3",
    imageAlt: "Trees being planted by volunteers",
    estimatedReadTime: 7,
  },
  {
    title: "Volunteer Stories: Making a Difference",
    slug: "volunteer-stories-making-difference",
    excerpt:
      "Real experiences from those making a change on the ground, from weekend warriors to full-time changemakers.",
    content: `
      <p>Volunteering transforms lives—not just for those receiving help but for the volunteers themselves. Our stories highlight the dedication of individuals who give their time, from weekend warriors painting community centers to full-time changemakers building schools. Take Maya, a college student who spent her summer teaching math in a rural village. She describes the joy of seeing her students solve problems for the first time, a moment that inspired her to pursue teaching. Or consider Raj, a retiree who organizes food drives, finding purpose in feeding hundreds weekly.</p>
      <p>These experiences show the power of small actions. A single day spent cleaning a park can spark community pride, encouraging others to join. Full-time volunteers, like those in our housing projects, build not just homes but hope, helping families move out of poverty. Each story is unique, yet they share a common thread: the belief that change starts with one person willing to act. Volunteers don’t need special skills—just compassion and commitment. We provide training and support to ensure their efforts make a lasting impact.</p>
      <p>Challenges exist, like burnout or logistical hurdles in remote areas. We tackle these with flexible schedules and strong coordination, ensuring volunteers feel valued. Community feedback shapes our programs, making them more effective. The ripple effect is undeniable: a child inspired by a volunteer’s kindness might grow up to lead change themselves. These stories remind us that volunteering isn’t just service—it’s a movement for a better world.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id semper risus, vitae ultricies justo. Donec id nisl eu ligula fermentum tincidunt. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>We invite everyone to join this journey. Whether you have an hour or a year, your contribution matters. Volunteering builds connections, skills, and purpose while shaping communities for the better. From planting trees to mentoring youth, every effort counts. These stories are just the beginning—your story could be next, driving change one step at a time.</p>
    `,
    author: "Ritu Verma",
    date: "2022-12-12T16:45:00Z",
    category: "Volunteers",
    tags: ["Volunteers", "Impact", "Community", "Youth"],
    image: "https://picsum.photos/800/500?random=4",
    imageAlt: "A group of volunteers cheering in front of a rural project site",
    estimatedReadTime: 6,
  },
];

export async function GET() {
  try {
    await connectToDatabase();

    const existingPosts = await BlogPost.countDocuments();

    if (existingPosts > 0) {
      return NextResponse.json({
        message: "Database already seeded",
        count: existingPosts,
      });
    }

    await BlogPost.insertMany(sampleBlogPosts);

    return NextResponse.json({
      message: "Database seeded successfully",
      count: sampleBlogPosts.length,
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
