import BundledEditor from './BundledEditor'
import { Controller } from 'react-hook-form';
// import './App.css';
import Container from '../container/Container';

export default function RTE({name,control,label,defaultValue}) {

  return (
    <Container>
        <Controller
            name={name}
            control={control}
            rules={{required:true}}
            render={({field:{onChange}})=>(
                <BundledEditor
                    initialValue={defaultValue || '<p>This is the initial content of the editor.</p>'}
                    init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={onChange}
                />
            )}
            />
        </Container>
  );
}