const PDFDocument = require("pdfkit");

const generateResumePDF = (resume, res) => {
  const doc = new PDFDocument({
    size: "A4",
    margins: {
      top: 42,
      bottom: 42,
      left: 48,
      right: 48,
    },
    info: {
      Title: `${resume.personalInfo?.name || "Resume"} - Resume`,
      Author: "ResumeIQ",
      Subject: "Professional Resume",
    },
  });

  const fileName =
    `${resume.personalInfo?.name || "Resume"}-Resume.pdf`
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .replace(/-+/g, "-");

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${fileName}"`
  );

  doc.pipe(res);

  const left = doc.page.margins.left;
  const right =
    doc.page.width - doc.page.margins.right;

  const contentWidth =
    right - left;

  // =========================================================
  // HELPERS
  // =========================================================

  const clean = (value) => {
    if (
      value === undefined ||
      value === null
    ) {
      return "";
    }

    return String(value).trim();
  };

  const hasValue = (value) => {
    return clean(value).length > 0;
  };

  const safeArray = (value) => {
    return Array.isArray(value)
      ? value
      : [];
  };

  const drawLine = (
    y,
    thickness = 0.7
  ) => {
    doc
      .save()
      .moveTo(left, y)
      .lineTo(right, y)
      .lineWidth(thickness)
      .strokeColor("#d9dee7")
      .stroke()
      .restore();
  };

  const ensureSpace = (
    requiredHeight = 60
  ) => {
    const bottomLimit =
      doc.page.height -
      doc.page.margins.bottom -
      25;

    if (
      doc.y + requiredHeight >
      bottomLimit
    ) {
      doc.addPage();
      doc.y =
        doc.page.margins.top;
    }
  };

  const sectionTitle = (
    title
  ) => {
    ensureSpace(45);

    doc.moveDown(0.65);

    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#111827")
      .text(
        title.toUpperCase(),
        left,
        doc.y,
        {
          width: contentWidth,
          characterSpacing: 0.5,
        }
      );

    const lineY =
      doc.y + 5;

    doc
      .moveTo(left, lineY)
      .lineTo(right, lineY)
      .lineWidth(1)
      .strokeColor("#111827")
      .stroke();

    doc.y =
      lineY + 11;
  };

  const bullet = (
    text,
    options = {}
  ) => {
    if (!hasValue(text)) {
      return;
    }

    ensureSpace(35);

    const bulletX =
      left + 2;

    const textX =
      left + 14;

    const width =
      contentWidth - 14;

    doc
      .font("Helvetica")
      .fontSize(
        options.fontSize || 9
      )
      .fillColor(
        options.color || "#374151"
      )
      .text(
        "•",
        bulletX,
        doc.y,
        {
          width: 8,
        }
      );

    doc.text(
      clean(text),
      textX,
      doc.y,
      {
        width,
        lineGap: 2,
      }
    );

    doc.moveDown(0.12);
  };

  const formatDateRange = (
    start,
    end
  ) => {
    const values = [];

    if (hasValue(start)) {
      values.push(clean(start));
    }

    if (hasValue(end)) {
      values.push(clean(end));
    }

    return values.join(" – ");
  };

  // =========================================================
  // HEADER
  // =========================================================

  const personalInfo =
    resume.personalInfo || {};

  const name =
    clean(personalInfo.name) ||
    "Your Name";

  doc
    .font("Helvetica-Bold")
    .fontSize(25)
    .fillColor("#111827")
    .text(
      name,
      left,
      doc.y,
      {
        width: contentWidth,
        align: "center",
      }
    );

  doc.moveDown(0.35);

  // Contact row
  const contact = [];

  if (
    hasValue(personalInfo.email)
  ) {
    contact.push(
      clean(personalInfo.email)
    );
  }

  if (
    hasValue(personalInfo.phone)
  ) {
    contact.push(
      clean(personalInfo.phone)
    );
  }

  if (
    hasValue(personalInfo.location)
  ) {
    contact.push(
      clean(personalInfo.location)
    );
  }

  if (contact.length > 0) {
    doc
      .font("Helvetica")
      .fontSize(8.8)
      .fillColor("#4b5563")
      .text(
        contact.join("  •  "),
        left,
        doc.y,
        {
          width: contentWidth,
          align: "center",
        }
      );

    doc.moveDown(0.25);
  }

  // Links row
  const links = [];

  if (
    hasValue(personalInfo.linkedin)
  ) {
    links.push(
      clean(personalInfo.linkedin)
    );
  }

  if (
    hasValue(personalInfo.github)
  ) {
    links.push(
      clean(personalInfo.github)
    );
  }

  if (links.length > 0) {
    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor("#2563eb")
      .text(
        links.join("  •  "),
        left,
        doc.y,
        {
          width: contentWidth,
          align: "center",
        }
      );
  }

  doc.moveDown(0.35);

  drawLine(doc.y);

  doc.moveDown(0.1);

  // =========================================================
  // PROFESSIONAL SUMMARY
  // =========================================================

  if (hasValue(resume.summary)) {
    sectionTitle(
      "Professional Summary"
    );

    doc
      .font("Helvetica")
      .fontSize(9.3)
      .fillColor("#374151")
      .text(
        clean(resume.summary),
        left,
        doc.y,
        {
          width: contentWidth,
          align: "left",
          lineGap: 3,
        }
      );
  }

  // =========================================================
  // EDUCATION
  // =========================================================

  const educationList =
    safeArray(resume.education);

  if (educationList.length > 0) {
    sectionTitle("Education");

    educationList.forEach(
      (education) => {
        ensureSpace(60);

        const degree =
          clean(education.degree) ||
          "Degree";

        const institution =
          clean(
            education.institution
          );

        const dateRange =
          formatDateRange(
            education.startYear,
            education.endYear
          );

        const grade =
          clean(education.grade);

        doc
          .font("Helvetica-Bold")
          .fontSize(10)
          .fillColor("#111827")
          .text(
            degree,
            left,
            doc.y,
            {
              width:
                contentWidth,
            }
          );

        if (institution) {
          doc
            .font("Helvetica")
            .fontSize(9)
            .fillColor("#374151")
            .text(
              institution,
              left,
              doc.y + 2,
              {
                width:
                  contentWidth,
              }
            );
        }

        const educationMeta = [];

        if (dateRange) {
          educationMeta.push(
            dateRange
          );
        }

        if (grade) {
          educationMeta.push(
            grade
          );
        }

        if (
          educationMeta.length > 0
        ) {
          doc
            .font("Helvetica")
            .fontSize(8.2)
            .fillColor("#6b7280")
            .text(
              educationMeta.join(
                "  •  "
              ),
              left,
              doc.y + 2,
              {
                width:
                  contentWidth,
              }
            );
        }

        doc.moveDown(0.55);
      }
    );
  }

  // =========================================================
  // EXPERIENCE
  // =========================================================

  const experienceList =
    safeArray(resume.experience);

  if (experienceList.length > 0) {
    sectionTitle("Experience");

    experienceList.forEach(
      (experience) => {
        ensureSpace(75);

        const position =
          clean(experience.position) ||
          "Position";

        const company =
          clean(experience.company);

        const dateRange =
          formatDateRange(
            experience.startDate,
            experience.endDate
          );

        doc
          .font("Helvetica-Bold")
          .fontSize(10)
          .fillColor("#111827")
          .text(
            position,
            left,
            doc.y,
            {
              width:
                contentWidth -
                100,
            }
          );

        if (dateRange) {
          doc
            .font("Helvetica")
            .fontSize(8.2)
            .fillColor("#6b7280")
            .text(
              dateRange,
              right - 100,
              doc.y - 10,
              {
                width: 100,
                align: "right",
              }
            );
        }

        doc.moveDown(0.1);

        if (company) {
          doc
            .font("Helvetica")
            .fontSize(9)
            .fillColor("#4b5563")
            .text(
              company,
              left,
              doc.y
            );
        }

        if (
          hasValue(
            experience.description
          )
        ) {
          doc.moveDown(0.2);

          const description =
            clean(
              experience.description
            );

          /*
           * If description contains line breaks,
           * convert them into clean bullet points.
           */
          const points =
            description
              .split(/\n+/)
              .map((item) =>
                item
                  .replace(/^[-•*]\s*/, "")
                  .trim()
              )
              .filter(Boolean);

          if (points.length > 1) {
            points.forEach(
              (point) =>
                bullet(point)
            );
          } else {
            bullet(description);
          }
        }

        doc.moveDown(0.25);
      }
    );
  }

  // =========================================================
  // SKILLS
  // =========================================================

  const skills =
    safeArray(resume.skills)
      .map((skill) =>
        clean(skill)
      )
      .filter(Boolean);

  if (skills.length > 0) {
    sectionTitle(
      "Technical Skills"
    );

    doc
      .font("Helvetica")
      .fontSize(9.2)
      .fillColor("#374151")
      .text(
        skills.join("  •  "),
        left,
        doc.y,
        {
          width: contentWidth,
          lineGap: 3,
        }
      );
  }

  // =========================================================
  // PROJECTS
  // =========================================================

  const projects =
    safeArray(resume.projects);

  if (projects.length > 0) {
    sectionTitle("Projects");

    projects.forEach(
      (project) => {
        ensureSpace(80);

        const projectName =
          clean(project.name) ||
          "Project";

        doc
          .font("Helvetica-Bold")
          .fontSize(10)
          .fillColor("#111827")
          .text(
            projectName,
            left,
            doc.y,
            {
              width:
                contentWidth -
                100,
            }
          );

        if (
          hasValue(project.link)
        ) {
          doc
            .font("Helvetica")
            .fontSize(7.8)
            .fillColor("#2563eb")
            .text(
              clean(project.link),
              right - 180,
              doc.y - 10,
              {
                width: 180,
                align: "right",
              }
            );
        }

        const technologies =
          safeArray(
            project.technologies
          )
            .map((tech) =>
              clean(tech)
            )
            .filter(Boolean);

        if (
          technologies.length > 0
        ) {
          doc.moveDown(0.15);

          doc
            .font("Helvetica-Oblique")
            .fontSize(8.3)
            .fillColor("#6b7280")
            .text(
              technologies.join(
                "  •  "
              ),
              left,
              doc.y,
              {
                width:
                  contentWidth,
              }
            );
        }

        if (
          hasValue(
            project.description
          )
        ) {
          doc.moveDown(0.2);

          const description =
            clean(
              project.description
            );

          const points =
            description
              .split(/\n+/)
              .map((item) =>
                item
                  .replace(/^[-•*]\s*/, "")
                  .trim()
              )
              .filter(Boolean);

          if (points.length > 1) {
            points.forEach(
              (point) =>
                bullet(point)
            );
          } else {
            bullet(description);
          }
        }

        doc.moveDown(0.3);
      }
    );
  }

  // =========================================================
  // CERTIFICATIONS
  // =========================================================

  const certifications =
    safeArray(
      resume.certifications
    );

  if (
    certifications.length > 0
  ) {
    sectionTitle(
      "Certifications"
    );

    certifications.forEach(
      (certification) => {
        ensureSpace(40);

        const certName =
          clean(
            certification.name
          );

        if (!certName) {
          return;
        }

        doc
          .font("Helvetica-Bold")
          .fontSize(9.5)
          .fillColor("#111827")
          .text(
            certName,
            left,
            doc.y,
            {
              width:
                contentWidth,
            }
          );

        const details = [];

        if (
          hasValue(
            certification.organization
          )
        ) {
          details.push(
            clean(
              certification.organization
            )
          );
        }

        if (
          hasValue(
            certification.year
          )
        ) {
          details.push(
            clean(
              certification.year
            )
          );
        }

        if (details.length > 0) {
          doc
            .font("Helvetica")
            .fontSize(8.3)
            .fillColor("#6b7280")
            .text(
              details.join(
                "  •  "
              ),
              left,
              doc.y + 2,
              {
                width:
                  contentWidth,
              }
            );
        }

        doc.moveDown(0.4);
      }
    );
  }

  // =========================================================
  // PAGE NUMBERS / FOOTER
  // =========================================================

  const addFooter = () => {
    const pageNumber =
      doc.bufferedPageRange().count;

    const currentPage =
      doc.bufferedPageRange()
        .start +
      pageNumber -
      1;

    doc
      .save()
      .font("Helvetica")
      .fontSize(7)
      .fillColor("#9ca3af")
      .text(
        `ResumeIQ  •  Page ${currentPage}`,
        left,
        doc.page.height - 28,
        {
          width: contentWidth,
          align: "center",
        }
      )
      .restore();
  };

  /*
   * Add footer to current page.
   *
   * PDFKit can create pages automatically while
   * writing content, so we add footer after content
   * has been generated.
   */

  addFooter();

  // =========================================================
  // FINISH
  // =========================================================

  doc.end();
};

module.exports = {
  generateResumePDF,
};