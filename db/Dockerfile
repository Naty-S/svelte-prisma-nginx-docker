FROM postgres:14

ARG DB_DUMP

# Copy database dump to postgres image home folder
COPY ${DB_DUMP}.gz ./home
