import React from "react";

type CourseInformationFormProps = {
  courseTitle?: string;
  courseDescription?: string;
  excerpt?: string;
  courseAuthor?: string;
  onFieldChange?: (
    field: "title" | "description" | "excerpt" | "author",
    value: string
  ) => void;
};

const CourseInformationForm = ({
  courseTitle = "",
  courseDescription = "",
  excerpt = "",
  courseAuthor = "Topylo (admin)",
  onFieldChange,
}: CourseInformationFormProps) => {
  return (
    <>
      <form>
        <div className="form-input-box mb-20">
          <div className="form-input-title">
            <label htmlFor="courseTitle">Course Title</label>
          </div>
          <div className="form-input">
            <input
              name="courseTitle"
              id="courseTitle"
              type="text"
              placeholder="Course Title"
              value={courseTitle}
              onChange={(e) =>
                onFieldChange?.("title", e.target.value)
              }
            />
          </div>
        </div>

        <div className="form-input-box mb-20">
          <div className="form-input-title">
            <label htmlFor="courseDescription">
              Course Description
            </label>
          </div>
          <div className="form-input">
            <textarea
              id="courseDescription"
              placeholder="Course Description"
              value={courseDescription}
              onChange={(e) =>
                onFieldChange?.("description", e.target.value)
              }
            ></textarea>
          </div>
        </div>

        <div className="form-input-box mb-20">
          <div className="form-input-title">
            <label htmlFor="courseExcerpt">Excerpt</label>
          </div>
          <div className="form-input">
            <textarea
              id="courseExcerpt"
              placeholder="Excerpt"
              value={excerpt}
              onChange={(e) =>
                onFieldChange?.("excerpt", e.target.value)
              }
            ></textarea>
          </div>
        </div>

        <div className="form-input-box">
          <div className="form-input-title">
            <label htmlFor="courseAuthor">Course Author</label>
          </div>
          <div className="form-input">
            <input
              name="courseAuthor"
              id="courseAuthor"
              type="text"
              value={courseAuthor}
              onChange={(e) =>
                onFieldChange?.("author", e.target.value)
              }
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default CourseInformationForm;
