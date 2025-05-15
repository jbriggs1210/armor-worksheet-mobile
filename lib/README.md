Everything in the /lib directory is for purposes of database migrations.

These files do not end up in ios artifact and thus can't be relied on
for purposes other than Typescript typing (DX) or run time dependencies.