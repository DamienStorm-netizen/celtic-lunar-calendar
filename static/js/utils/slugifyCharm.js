export function slugifyCharm(name) {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")   // Remove anything that's not a letter, number, space, or hyphen
      .replace(/\s+/g, "-");          // Replace spaces with dashes
  }