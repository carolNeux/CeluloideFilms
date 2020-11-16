<!-- <li>Para que me muestre a los actores....Pertence al género <%=movies.genre%> </li>  <%=movies.actores%>  -->

            <li>Actores:
                <ul>
                    <%for(let i=0; i<movies.actores.length; i++){ %>
                        <li> <%=movies.actores[i].first_name %>+' ' +<%=movies.actores[i].last_name %></li>
                    <%}%>
                </ul>
            </li>
