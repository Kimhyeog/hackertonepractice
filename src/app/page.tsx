import { Header } from "@/components/Header";
import ImageSendBox from "@/components/ImageSendBox";
import PostList from "@/components/Posts/PostList";

export default function Home() {
  return (
    <div className="">
      <Header />
      <PostList />
      <ImageSendBox />
    </div>
  );
}
