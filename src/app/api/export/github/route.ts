import { NextRequest, NextResponse } from "next/server";
import { UserStory } from "@/lib/types/blueprint";

export async function POST(req: NextRequest) {
  try {
    const { repoOwner, repoName, githubToken, userStories } = await req.json();

    if (!userStories || !Array.isArray(userStories) || userStories.length === 0) {
      return NextResponse.json({ error: "No user stories provided for export." }, { status: 400 });
    }

    const token = githubToken || process.env.GITHUB_TOKEN;

    if (token && repoOwner && repoName) {
      const createdIssues = [];
      for (const story of userStories.slice(0, 5)) {
        const bodyContent = `### User Story: ${story.title}
**As a:** ${story.asA}
**I want to:** ${story.iWantTo}
**So that:** ${story.soThat}

#### Acceptance Criteria:
${story.acceptanceCriteria.map((c: string) => `- [ ] ${c}`).join("\n")}

**Complexity:** ${story.complexity}
**Scope:** ${story.isMvp ? "MVP" : "Future Release"}

*Generated autonomously by ScopePilot AI*`;

        const ghRes = await fetch(
          `https://api.github.com/repos/${repoOwner}/${repoName}/issues`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github+json",
              "User-Agent": "ScopePilot-AI"
            },
            body: JSON.stringify({
              title: `[${story.id}] ${story.title}`,
              body: bodyContent,
              labels: [story.isMvp ? "mvp" : "v2", story.epic.toLowerCase().replace(/\s+/g, "-")]
            })
          }
        );

        if (ghRes.ok) {
          const issueData = await ghRes.json();
          createdIssues.push(issueData.html_url);
        }
      }

      return NextResponse.json({
        success: true,
        message: `Successfully created ${createdIssues.length} issues in GitHub!`,
        issueUrls: createdIssues
      });
    }

    // Demo / Simulated mode
    return NextResponse.json({
      success: true,
      message: `Export simulation complete! ${userStories.length} User Stories formatted and ready for GitHub Backlog sync.`,
      mode: "simulated_sync"
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to export issues to GitHub" },
      { status: 500 }
    );
  }
}
