import React from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";

export default function Editor({ currentNote, updateNote }) {
  //components takes two props currentNote and updateNote
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <section className="pane editor">
      <ReactMde
        value={currentNote.body}
        onChange={updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={100}
        heightUnits="vh"
      />
    </section>
  );
}
//fair amount of elements imported from dependencies?
//this would be the editor that allows us to write and read notes, hence the selectedTab state with write
