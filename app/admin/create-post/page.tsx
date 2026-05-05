import { Container } from '@/components/Container';
import Editor from '@/components/Editor';

const CreatePostPage = () => {
  return (
    <Container className="flex h-full flex-col py-4">
      <Editor />
    </Container>
  );
};

export default CreatePostPage;
