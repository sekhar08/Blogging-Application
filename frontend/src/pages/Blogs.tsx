import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";

export const Blogs = () => {
  return (
    <div>
      <Appbar />
      <div className=" flex justify-center">
        <div className="max-w-xl">
          <BlogCard
            authorName="Chandra"
            title="How AI is going to take over humanity"
            content="Artificial intelligence is the new era of computing, with skynet taking over the computers across the world and taking control of weapons we need a messiah"
            publishedDate="08/11/03"
          />

          <BlogCard
            authorName="Chandra"
            title="How AI is going to take over humanity"
            content="Artificial intelligence is the new era of computing, with skynet taking over the computers across the world and taking control of weapons we need a messiah"
            publishedDate="08/11/03"
          />

          <BlogCard
            authorName="Chandra"
            title="How AI is going to take over humanity"
            content="Artificial intelligence is the new era of computing, with skynet taking over the computers across the world and taking control of weapons we need a messiah"
            publishedDate="08/11/03"
          />
          <BlogCard
            authorName="Chandra"
            title="How AI is going to take over humanity"
            content="Artificial intelligence is the new era of computing, with skynet taking over the computers across the world and taking control of weapons we need a messiah"
            publishedDate="08/11/03"
          />
        </div>
      </div>
    </div>
  );
};
